<?php
/*
Plugin Name: Event Webhook
Description: Makes a request to the Bslim app when a new event is created
Version: 0.1.0
Author: Gaauwe Rombouts
Author URI: https://grombouts.nl
*/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

add_action('wp_insert_post', 'webhook', 10, 3);
function webhook($post_ID, $post, $update)
{
    if(eo_get_venue($post_ID) != False && $update == True){
        $trigger = file_get_contents("http://gaauwe.nl:5000/api/createEventTrigger?id=" . $post_ID);
    }
}

function get_latest_post(WP_REST_Request $request)
{
    kses_remove_filters();

    $event_data = array(
        'start' => new DateTime($request->get_param('start'), eo_get_blog_timezone()),
        'end' => new DateTime($request->get_param('end'), eo_get_blog_timezone())
    );
    $post_data  = array(
        'post_title' => $request->get_param('title'),
        'post_status' => 'publish',
        'post_category' => array(
            8
        ),
        'post_author' => $request['author'],
        'post_content' => $request->get_param('content')
    );

    $post_id = eo_insert_event($post_data, $event_data);


    $jsonGeo = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?place_id=".$request->get_param('address')."&key=AIzaSyAlHhXzz2tr1rZC0ia_7XgiCSLEDB4Dl5c");
    $dataGeo = json_decode($jsonGeo, true);


    foreach ($dataGeo['results'][0]['address_components'] as $address_components):
            if(in_array('street_number', $address_components['types'])){
                $street_number = $address_components['long_name'];
            }
            if(in_array('route', $address_components['types'])){
                $street = $address_components['long_name'];
            }
            if(in_array('postal_code', $address_components['types'])){
                $postcode = $address_components['long_name'];
            }
            if(in_array('administrative_area_level_2', $address_components['types'])){
                $city = $address_components['long_name'];
            }
            if(in_array('administrative_area_level_1', $address_components['types'])){
                $state = $address_components['long_name'];
            }
            if(in_array('country', $address_components['types'])){
                $country = $address_components['long_name'];
            }

        endforeach;

    $returnID = "";



    $args = array(
        'address' => $street ." ". $street_number,
        'city' => $city,
        'state' => $state,
        'postcode' => $postcode,
        'country' => $country
    );

    $venues = eo_get_venues();
    if ($venues) {
        foreach ($venues as $venue):
            $venue_id   = (int) $venue->term_id;
            $venueArray = eo_get_venue_address($venue_id);
            if ($venueArray['address'] === $street ." ". $street_number) {
                $returnID = $venue_id;
                $venue = eo_get_venue_slug($returnID) . "old";
                $venueAddress = $street ." ". $street_number;
                break;
            }
        endforeach;

        if($returnID == ""){
            $returnID = eo_insert_venue($street ." ". $street_number, $args)['term_taxonomy_id'];
            $venue = eo_get_venue_slug($returnID) . "new";

            $venueArray = eo_get_venue_address($returnID);
            $venueAddress = $venueArray['address'];
        }
    }
    $json = file_get_contents("http://gromdroid.nl/bslim/wp-json/wp/v2/event-venues/" . $returnID);
    $data = json_decode($json, true);


    wp_set_post_terms( $post_id, $data['slug'], 'event-venue' );


    $trigger = file_get_contents("http://gaauwe.nl:5000/api/createEventTrigger?id=" . $post_id);


    kses_init_filters();

    return $data['slug'];
}

function authenticate(WP_REST_Request $request)
{
    kses_remove_filters();

    $username = $request['data']['username'];
    $password = $request['data']['password'];
    kses_init_filters();

    return wp_authenticate($username, $password);
}


function changeAuthor(WP_REST_Request $request)
{
    kses_remove_filters();

    $author = $request['author'];
    $post   = $request['post'];
    $arg    = array(
        'ID' => $post,
        'post_author' => $author
    );

    kses_init_filters();

    return wp_update_post($arg);
}

function getVenue(WP_REST_Request $request)
{
    kses_remove_filters();

    $venues = eo_get_venues();


    kses_init_filters();

    return 'Einde';
}



// Register the REST route here.
add_action('rest_api_init', function()
{
    register_rest_route('gaauwe/v1', 'create-post', array(
        'methods' => 'POST',
        'callback' => 'get_latest_post'
    ));
});

add_action('rest_api_init', function()
{
    register_rest_route('gaauwe/v1', 'authenticate', array(
        'methods' => 'POST',
        'callback' => 'authenticate'
    ));
});

add_action('rest_api_init', function()
{
    register_rest_route('gaauwe/v1', 'author', array(
        'methods' => 'POST',
        'callback' => 'changeAuthor'
    ));
});

add_action('rest_api_init', function()
{
    register_rest_route('gaauwe/v1', 'venue', array(
        'methods' => 'GET',
        'callback' => 'getVenue'
    ));
});


?>

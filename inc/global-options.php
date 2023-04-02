<?php

/**
 * @package    DWT 
 * @version    1.0.0
 */

/**
 * Global Options Settings
 * - Handles all the settings in the Global Settings page except for the Form Style
 * @see handle_classes and admin_classes in theme.php for Form Style handling
 */
class global_options_settings
{
    private $settings_colors = [];

    private $color_palette = [
        'Black' => '#000',
        'Light Gray' => '#f6f6f6',
        'White' => '#fff',
        'Peach' => '#ffedd3',
        'Tan' => '#fbf8f1'
    ];

    public function __construct()
    {
        if ( ! function_exists('acf_add_options_page') ) {
            return null;
        }

        add_action( 'init', [ $this, 'acf_options_page' ] );
        add_action( 'admin_head', [ $this, 'add_color_settings' ] );
    }    

    /**
     * ACF Options Page
     * - Add options page to dashboard
     */
    public function acf_options_page() : void
    {
        acf_add_options_page( array(
            'page_title'    => 'Global Settings',
            'menu_title'    => 'Global Settings',
            'menu_slug'     => 'global-settings',
            'capability'    => 'create_users',
            'redirect'      => false
        ) );
    }

    /**
     * Add Color Settings
     * - Create CSS vars for colors
     * - Add to style tag in header.php
     * - Add to admin head
     */    
    public static function add_color_settings()
    {
        $colors = (new self)->setup_color_settings();

        echo "<style>
            :root {
                --book-cover-bg-color: {$colors->book_cover_bg_color};
                --carousel-nav-bg-color: {$colors->carousel_nav_background_color};
                --carousel-nav-arrow-color: {$colors->carousel_nav_arrow_color};
            }
        </style>";
    }

    /**
     * Setup Color Settings
     * - Get color fields from ACF fields
     * - Create object of colors
     */  
    private function setup_color_settings() : Object
    {
        $this->settings_colors = [
            'carousel_nav_background_color' => get_field( 'carousel_navigation_background_color', 'options' ),
            'carousel_nav_arrow_color' => get_field( 'carousel_navigation_arrow_color', 'options' ),
            'book_cover_bg_color' => get_field( 'book_cover_background_color', 'options' ),
        ];

        $colors_obj = new stdClass();
        foreach( $this->settings_colors as $key => $value ) {
            foreach( $this->color_palette as $k => $v ) {
                if ( isset( $value ) && $value === $k ) {
                    $colors_obj->$key = $v;
                }
            }
        }
        return $colors_obj;
    }
}

new global_options_settings();

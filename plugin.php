<?php
/**
 * Plugin Name: Description List — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/lassemt/wp-block-description-list
 * Description: Create a description list in the gutenberg editor
 * Author: Lasse Mejlvang Tvedt (LasseMT)
 * Author URI: http://lassemt.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

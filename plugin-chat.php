<?php
/*
Plugin Name: Plugin Chat MyJobits
Description: Chat flotante con integración n8n.
Version: 1.0
Author: Tu Nombre
*/

add_action('wp_footer', function() {
    // Cambia la ruta si tu archivo JS está en otra carpeta
    $js_url = plugins_url('dist/main.umd.js', __FILE__);
    echo '<script src="' . esc_url($js_url) . '"></script>';
    echo '<script>window.addEventListener("DOMContentLoaded",function(){window.pluginChat&&window.pluginChat.initChatWidget&&window.pluginChat.initChatWidget();});</script>';
});

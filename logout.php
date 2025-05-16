<?php
session_start();
session_unset();
session_destroy();

// Redirigir a index.html (puedes cambiarlo si prefieres ir a login)
header("Location: index.html");
exit();

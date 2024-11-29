<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $oraperc = date("Ymd_His");
    $konyvtarNev = $email . "_" . $oraperc;
    $uploadDir = 'uploads/' . $konyvtarNev . '/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $files = $_FILES['photos'];
    $quantities = $_POST['quantity'];
    $sizes = $_POST['size'];

    // Save order details to a file or database
    $orderDetails = "Név: $name\nTelefonszám: $phone\n";
    for ($i = 0; $i < count($files['name']); $i++) {
        $fileName = basename($files['name'][$i]);
        $targetFile = $uploadDir . $fileName;
        if (move_uploaded_file($files['tmp_name'][$i], $targetFile)) {
            $orderDetails .= "Képfájl: $fileName, Mennyiség: $quantities[$i], Méret: $sizes[$i]\n";
        }
    }
    file_put_contents($uploadDir . 'order.txt', $orderDetails, FILE_APPEND);

    // Send confirmation email
    $to = $email;
    $subject = "BestDuo Fotó - Megrendelés visszaigazolása";
    $message = "Köszönjük a megrendelést! A képeket feldolgozzuk és hamarosan értesítjük a megadott elérhetőségek egyikén. - BestDuo Fotószaküzlet";
    mail($to, $subject, $message);

    // Send notification to the photo shop
    $toShop = "suckee86@gmail.com";
    $subjectShop = "Új megrendelés érkezett";
    $messageShop = "Új megrendelés érkezett az alábbi email címről: $email\nNév: $name\nTelefonszám: $phone";
    mail($toShop, $subjectShop, $messageShop);

    echo "Megrendelés sikeresen elküldve!";
}
?>

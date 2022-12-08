<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
putenv("GOOGLE_APPLICATION_CREDENTIALS=image-search-key.json");

require '../vendor/autoload.php';

use Google\Cloud\Vision\V1\ImageAnnotatorClient;
use Google\Cloud\Translate\TranslateClient;

$file = $_GET['file'];
// GET Result
$results = detect_object("http://sestinidocs.com.br/links/sestini/ecomm-api/images/$file");
foreach ($results as $key => $result) {
    $translatedName = translateText($result['name']);
    $results[$key]['name'] = $translatedName;
}

print_r(json_encode(array("results" => $results, "fileName" => $file)));

function detect_object($path)
{
    // Annotator
    $imageAnnotator = new ImageAnnotatorClient();
    $image          = file_get_contents($path);
    $response       = $imageAnnotator->objectLocalization($image);
    $objects        = $response->getLocalizedObjectAnnotations();
    // Result array
    $result = array();
    foreach ($objects as $object) {
        $name     = $object->getName();
        $score    = $object->getScore();
        $vertices = $object->getBoundingPoly()->getNormalizedVertices();
        $axes     = array();
        foreach ($vertices as $vertex) {
            $x = $vertex->getX();
            $y = $vertex->getY();
            $axes[] = array($x, $y);
        }
        $result[] = array('name' => $name, 'score' => $score, 'vertices' => $axes);
    }
    $imageAnnotator->close();
    return $result;
}

function translateText($text)
{
    $translate = new TranslateClient();
    $result = $translate->translate($text, ['target' => 'pt_BR']);
    return $result['text'];
}

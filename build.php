<?php
/*
 * Input: files matching src/pages/*.html
 * Output: public/*.html
 *
 * Pages can extend a template by calling:
 *
 *   extend(string $relativeTemplatePath, array $variables)
 *
 * at the start and:
 *
 *   endExtend()
 *
 * at the end. Inside the template you can:
 *
 *   echo $content;
 *
 * Pages and parts can use the following method to pass data down:
 *
 *   includePart(string $relativePath, array $variables, bool $print)
 *
 * If environment variables are needed you can define these as PHP constants in:
 *
 *  - env.php
 *  - env.prod.php
 *
 * Don't put anything secret in here. These are compiled into the built HTML.
 *
 * To run in prod mode, call `build.php --prod`
 */

$inPath  = __DIR__ . '';
$outPath = __DIR__ . '';
$savedTemplatePath = null;
$savedTemplateVariables = [];

function includePart(string $relativePath, array $variables = [], bool $print = true)
{
    $calledBy = debug_backtrace()[0]['file'];

    $actualPath = dirname($calledBy) . '/' . $relativePath;

    $output = NULL;

    if (! file_exists($actualPath)) {
        echo("\n\nERROR: Part $actualPath doesn't exist\n\n");
        die();
    }

    // Extract the variables to a local namespace
    extract($variables);

    // Start output buffering
    ob_start();

    // Include the template file
    include $actualPath;

    // End buffering and return its contents
    $output = ob_get_clean();

    if ($print) {
        print $output;
    }
    return $output;
}

function extend(string $template, array $variables)
{
    global $savedTemplatePath, $savedTemplateVariables;

    $calledBy = debug_backtrace()[0]['file'];

    $actualPath = dirname($calledBy) . '/' . $template;

    $savedTemplatePath = $actualPath;

    $savedTemplateVariables = $variables;

    // Start output buffering
    ob_start();
}

function endExtend()
{
    global $savedTemplatePath, $savedTemplateVariables;

    // End output buffering of content
    $content = ob_get_clean();

    extract($savedTemplateVariables);

    ob_start();

    include $savedTemplatePath;

    $output = ob_get_clean();

    echo $output;
}

function buildFile($filePath)
{
    $output = NULL;
    if (file_exists($filePath)) {
        // Start output buffering
        ob_start();

        // Include the template file
        include $filePath;

        // End buffering and return its contents
        $output = ob_get_clean();
    }
    return $output;
}

/*
 * This checks for, creates, and deletes the HTML file contents of the path
 */
function clean($path) {
    echo "CLEANING HTML from $path\n";

    if (! file_exists($path)) {
        echo "CREATING output path $path\n";
        if (! mkdir($path, 0777, true)) {
            echo "ERROR: Couldn't create output directory $path\n";
            die();
        };
    }

    $htmlFiles = glob($path . '/*.html');
    foreach($htmlFiles as $htmlFile) {
        echo "DELETING $htmlFile\n";
        unlink($htmlFile);
    }
}

function build()
{
    global $inPath, $outPath;

    clean($outPath);

    $files = glob($inPath . '/*.php');

    foreach ($files as $file) {
        // Exclude build.php from the loop
        if (basename($file) === 'build.php') {
            continue;
        }
        if (basename($file) === 'portfolio-uploader.php') {
            continue;
        }

        $outfile = str_replace($inPath, $outPath, $file);
        $outfile = pathinfo($outfile, PATHINFO_FILENAME) . '.html'; // Change the file extension to .html
        print "BUILDING $file to $outfile\n";
        $out = buildFile($file, false);
        file_put_contents($outfile, $out);
    }
}


if (isset($argv[1]) && $argv[1] === 'clean') {
    // Assuming $outPath is defined elsewhere in your script
    clean($outPath);
    echo "Cleaned $outPath\n";
} else {
    // Your existing build logic here
    build();
}
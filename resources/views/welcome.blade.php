<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <meta name="author" content="{{ env('ORGANIZATION_NAME') }}">
        <meta name="description" content="&iexcl;{{ env('APP_NAME') }}&#33;">

        <title>&iexcl;{{ env('APP_NAME') }}&#33;</title>

        <link href="http://nosjuimos.com/images/nj.ico" rel="shortcut icon">
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>

        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>

    <div class="container">
            <div class="row">
                <h1 class="text-primary">{{data_get($data, 'title')}}</h1>
            </div>
            <div class="row">
                <h3 class="text-success">{{data_get($data, 'message')}}</h3>
            </div>


    </div>







</body>


</html>
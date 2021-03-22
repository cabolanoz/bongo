@extends('layouts.app')

<link rel="stylesheet" href="css/404.css" />

@section('content')
<div class="container">
    <div class="col-md-6 offset-md-3 d-flex flex-column my-5">
        <picture class="text-center">
            <img class="img-fluid" src="images/404.png" alt="404">
        </picture>
        <h4 class="message mt-5 text-center">
            <b>ERROR 404</b>
            <b>AL MEJOR MONO SE LE CAE EL ZAPOTE</b><br>
            LO SENTIMOS, ESTA PÁGINA NO ESTÁ DISPONIBLE, ES POSIBLE QUE EL ENLACE QUE SEGUISTE ESTE ROTO O SE HAYA ELIMINADO.
        </h4>

        <div class="d-flex justify-content-center">
            <a class="btn btn-dark mt-5" href="/">REGRESAR</a>
        </div>
    </div>
</div>
@endsection

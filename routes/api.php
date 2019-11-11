<?php

Route::group(["prefix" => "auth", "namespace" => "API\Auth"], function($router) {
    Route::post("login", "AuthController@login");
    Route::post("logout", "AuthController@logout");
    Route::post("refresh", "AuthController@refresh");
    Route::post("me", "AuthController@me");

    Route::post("register", "RegisterController@register");
});

Route::group(["prefix" => "messages", "namespace" => "API"], function($router) {
    Route::post("/", "MessagesController@store")->middleware("jwt.auth");
    Route::get("/", "MessagesController@get");
});
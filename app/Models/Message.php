<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $table = "messages";
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }
}

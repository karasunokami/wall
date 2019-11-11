<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Events\NewMessageEvent;

class MessagesController extends Controller
{
    public function store(Request $request)
    {
        $request = $request->validate([
            'text' => 'required',
        ]);

        $message = new Message();
        $message->text = $request["text"];
        $message->user_id = \Auth::user()->id;
        $message->save();
        $message->load("user");

        NewMessageEvent::dispatch($message);
    }

    public function get(Request $request)
    {
        $request = $request->validate([
            "offset" => "required|numeric|min:0",
        ]);

        $messages = Message::orderBy("id", "desc")->skip($request["offset"])->take(15)->with("user")->get();

        return response()->json([
            "status" => true,
            "messages" => $messages
        ]);
    }

    public function update(Request $request)
    {
        $request = $request->validate([
            "id" => "required",
            "text" => "required"
        ]);

        $user = \Auth::user()->load("roles");
        $message = Message::find($request["id"]);

        if (is_null($message)) {
            return $this->badRequestResponse("message undefined");
        }

        $now = \Carbon::now();
        $created_at = Carbon::parse($message->created_at);

        if (!$user->hasRole("admin") && !$created_at->diffInHours($now) < 2) {
            return badRequestResponse("unable to update message");
        }

        $message->update($request);

        return response()->json([
            "status" => true,
            "message" => $message
        ]);
    }

    private function badRequestResponse($error)
    {
        return response()->json([
            "status" => false,
            "error" => $error
        ]);
    }
}

package hello;

import com.google.gson.Gson;

public class Event {

    private String content;
    private String message;
    private long type;

    public Event() {
    }

    public Event(String content, String message, long type){
        this.content = content;
        this.message = message;
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public String getMessage() {
        return message;
    }

    public long getType() {
        return type;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }

}

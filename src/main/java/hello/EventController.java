package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
public class EventController {

    private static SimpMessageSendingOperations messagingTemplate;

    @Autowired
    public EventController(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 3000)
    public static void publishEvent() {
        EventController.messagingTemplate.convertAndSend("/topic/events",
                new Event("Issue Failed", "This issue just went to shit!", 0));
    }

}
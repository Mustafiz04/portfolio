---
title: 'Mediator Pattern'
date: '2024-05-28'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Mediator Pattern: Centralizing communication for enhanced flexibility and decoupling in complex systems.'
authors: ['default']
type: 'Blog'
images: []
---

A behavioural design pattern called the Mediator pattern centralises communication between components in a system, hence promoting loose coupling. Objects interact through a mediator object rather than speaking to one other directly. By reducing the dependencies between communication components, this method improves the flexibility and maintainability of the system. When many objects need to interact in a coordinated way, the mediator pattern comes in handy in complicated systems.

## Current Problem

Objects in complex systems frequently depend on one another for communication in order to carry out their functions. Direct object-to-object communication can result in a complex web of dependencies that make it challenging to expand and maintain the system. A single change may have repercussions that necessitate adjustments to numerous other objects. This close dependency makes testing and debugging more difficult and limits scalability.

## Solution through Mediator Pattern

In order to overcome these difficulties, the Mediator pattern presents a mediator object that manages object-to-object communication. Instead of interacting directly, objects now communicate with one another via the mediator. By reducing the amount of dependencies and simplifying the relationships between items, this decoupling improves the flexibility and maintainability of the system. Adhering to the notion of encapsulation, the mediator can oversee intricate interactions and guarantee that objects remain oblivious of one another.

## Real-World Applications

Consider an air traffic control system where multiple aircraft need to coordinate their actions, such as takeoff, landing, and navigating the airspace.

1. **Centralized Coordination**: The air traffic controller acts as the mediator, coordinating communication between aircraft.
2. **Decoupled Communication**: Aircraft do not communicate directly with each other but through the air traffic controller, reducing the complexity of interactions.
3. **Scalability**: New aircraft can be added to the system without affecting existing ones, as they only need to interact with the mediator.

## Structure

The Mediator pattern typically includes the following components:

1. **Mediator**: Defines an interface for communication between Colleague objects.
2. **ConcreteMediator**: Implements the Mediator interface and coordinates communication between Colleagues.
3. **Colleague**: Defines an interface for objects that interact with each other through the mediator.
4. **ConcreteColleague**: Implements the Colleague interface and interacts with other Colleagues through the mediator.

## Real-World Example with Code Snippet

Let's implement an example where a chat room acts as the mediator for user communication:

```Java
// Mediator Interface
interface ChatMediator {
    void sendMessage(String message, User user);
    void addUser(User user);
}

// ConcreteMediator
class ChatRoom implements ChatMediator {
    private List<User> users = new ArrayList<>();

    @Override
    public void addUser(User user) {
        this.users.add(user);
    }

    @Override
    public void sendMessage(String message, User user) {
        for (User u : users) {
            if (u != user) {
                u.receive(message);
            }
        }
    }
}

// Colleague
abstract class User {
    protected ChatMediator mediator;
    protected String name;

    public User(ChatMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }

    public abstract void send(String message);
    public abstract void receive(String message);
}

// ConcreteColleague
class ConcreteUser extends User {

    public ConcreteUser(ChatMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void send(String message) {
        System.out.println(this.name + ": Sending Message = " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void receive(String message) {
        System.out.println(this.name + ": Received Message = " + message);
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        ChatMediator chatMediator = new ChatRoom();

        User user1 = new ConcreteUser(chatMediator, "Alice");
        User user2 = new ConcreteUser(chatMediator, "Bob");
        User user3 = new ConcreteUser(chatMediator, "Charlie");
        User user4 = new ConcreteUser(chatMediator, "Diana");

        chatMediator.addUser(user1);
        chatMediator.addUser(user2);
        chatMediator.addUser(user3);
        chatMediator.addUser(user4);

        user1.send("Hello, everyone!");
    }
}
```

## Pros and cons

### Pros:

1. Promotes loose coupling between objects by centralizing communication.
2. Simplifies object interactions and dependencies.
3. Enhances scalability and maintainability.
4. Facilitates better control over communication and interaction.

### Cons:

1. Can become a performance bottleneck if the mediator is overburdened.
2. The mediator can become overly complex, becoming a "god object."
3. Adds an extra layer of abstraction which can complicate understanding and debugging.

## Conclusion

In order to encourage loose coupling and improve maintainability, the Mediator design offers an efficient means of controlling communication between objects in a system. It streamlines the relationships between items by centralising interactions, which increases the system's scalability and manageability. But, great care must be taken to prevent overcomplication or creating a performance barrier for the mediator.

---
title: 'Command Pattern'
date: '2024-05-20'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Command Pattern: Empowering flexible and decoupled request handling in software systems.'
authors: ['default']
type: 'Blog'
images: []
---

A behavioural design pattern called the Command pattern transforms a request into an independent object with all of the request's details. This transformation makes it possible to queue operations, log their execution, and parameterize objects with operations. Furthermore, it makes undoable procedures easier. This design pattern is popular because it allows for flexibility and extensibility when developing software systems and is useful when separating objects that generate instructions from those that carry them out.

## Current Problem

It might be difficult to manage operations, actions, or requests in big software systems in a flexible and decoupled way. It is common for closely connected code to result from directly executing methods on objects, which makes it challenging to modify, extend, or reverse actions. This inflexibility can make the system less flexible and scalable, particularly when actions need to be queued, recorded, or reversed.

## Solution through Command Pattern

In order to overcome these difficulties, the Command pattern encapsulates a request as an object, enabling clients to be parameterized with queues, requests, and operations. In addition to encouraging loose coupling, this encapsulation offers a common method for managing, extending, and carrying out operations. In order to ensure that activities can be effectively controlled, extended, and undone, the design consists of four basic components: Command, ConcreteCommand, Client, and Invoker.

## Real-World Applications

Consider a text editor application where users can perform operations like typing, deleting text, or formatting text. Each of these operations can be encapsulated as commands.

1. **Command Handling**: Each text operation (e.g., type, delete, format) is represented as a command object.
2. **Execution**: The command objects are executed by an invoker, such as a button click or a menu selection.
3. **Undo/Redo**: Commands can be stored in a history list, allowing users to undo or redo operations.

## Structure

The Command pattern typically includes the following components:

1. **Command**: Declares an interface for executing an operation.
2. **ConcreteCommand**: Implements the Command interface and defines a binding between a Receiver object and an action.
3. **Client**: Creates a ConcreteCommand object and sets its receiver.
4. **Invoker**: Asks the command to carry out the request.
5. **Receiver**: Knows how to perform the operations associated with carrying out the request.

## Real-World Example with Code Snippet

Let's consider a basic example of a simple remote control for a light, where the remote control can turn the light on and off:

```Java
// Command Interface
interface Command {
    void execute();
}

// Receiver
class Light {
    public void on() {
        System.out.println("Light is ON");
    }

    public void off() {
        System.out.println("Light is OFF");
    }
}

// ConcreteCommand for turning on the light
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }
}

// ConcreteCommand for turning off the light
class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }
}

// Invoker
class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        Light livingRoomLight = new Light();

        Command lightOn = new LightOnCommand(livingRoomLight);
        Command lightOff = new LightOffCommand(livingRoomLight);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();

        remote.setCommand(lightOff);
        remote.pressButton();
    }
}
```

## Pros and cons

### Pros:

1. Decouples the object that invokes the operation from the one that knows how to perform it.
2. New commands can be added without changing existing code.
3. Supports undo and redo operations.
4. Allows for logging and queuing of operations.

### Cons:

1. May result in a large number of small classes.
2. Can add complexity to the system.

## Conclusion

In programme design, the Command pattern provides a strong means of encapsulating requests as objects, encouraging flexibility and decoupling. As a useful tool for creating flexible and maintainable systems, the pattern encapsulates activities and makes it easier to extend, queue, log, and undo/redo functionality.

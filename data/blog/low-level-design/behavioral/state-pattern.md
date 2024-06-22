---
title: 'State Pattern'
date: '2024-06-15'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'State Pattern: Dynamic behavior changes through state encapsulation.'
authors: ['default']
type: 'Blog'
images: []
---

An object can adapt its behaviour to changes in its internal state by using the State pattern, a behavioural design pattern. This pattern offers a tidy and manageable approach to encapsulate state-specific logic, and is especially helpful when an object needs to alter its behaviour based on its current state. The Open/Closed Principle is supported by the State pattern, which makes it possible to add new states without changing the state-handling code that already exists.

## Current Problem

Objects can exist in more than one state in many software applications, and these states can affect how an object behaves. Complex and closely coupled code might result from implementing state-specific behaviour directly within the methods of the object. Large conditional statements that are dispersed throughout the codebase as a result of this technique are common, making it challenging to maintain and expand.

## Solution through State Pattern

These problems are resolved by the State pattern, which divides state-specific functionality into distinct state classes. A common interface is implemented by each state class, and a reference to the current state is kept by the context object. The context assigns the state-specific behaviour to the current state object when the state changes. By separating the state-specific behaviour from the context, this method facilitates system expansion and maintenance.

## Real-World Applications

Consider a media player that can be in different states: playing, paused, or stopped.

1. **Separate States**: The media player’s states (playing, paused, stopped) are implemented as separate classes.
2. **Encapsulation**: Each state class encapsulates the behavior associated with that state.
3. **Dynamic Behavior**: The media player changes its behavior dynamically based on its current state.

## Structure

The State pattern typically includes the following components:

1. **State**: Defines an interface for encapsulating the behavior associated with a particular state.
2. **ConcreteState**: Implements behavior associated with a state of the context.
3. **Context**: Maintains an instance of a ConcreteState subclass that defines the current state.

## Real-World Example with Code Snippet

Let's implement an example where a media player uses the State pattern to manage its states:


```Java
// State Interface
interface State {
    void play(MediaPlayer context);
    void pause(MediaPlayer context);
    void stop(MediaPlayer context);
}

// ConcreteState for Playing
class PlayingState implements State {
    @Override
    public void play(MediaPlayer context) {
        System.out.println("Already playing.");
    }

    @Override
    public void pause(MediaPlayer context) {
        System.out.println("Pausing the player.");
        context.setState(new PausedState());
    }

    @Override
    public void stop(MediaPlayer context) {
        System.out.println("Stopping the player.");
        context.setState(new StoppedState());
    }
}

// ConcreteState for Paused
class PausedState implements State {
    @Override
    public void play(MediaPlayer context) {
        System.out.println("Resuming the player.");
        context.setState(new PlayingState());
    }

    @Override
    public void pause(MediaPlayer context) {
        System.out.println("Already paused.");
    }

    @Override
    public void stop(MediaPlayer context) {
        System.out.println("Stopping the player.");
        context.setState(new StoppedState());
    }
}

// ConcreteState for Stopped
class StoppedState implements State {
    @Override
    public void play(MediaPlayer context) {
        System.out.println("Starting the player.");
        context.setState(new PlayingState());
    }

    @Override
    public void pause(MediaPlayer context) {
        System.out.println("Cannot pause. The player is stopped.");
    }

    @Override
    public void stop(MediaPlayer context) {
        System.out.println("Already stopped.");
    }
}

// Context
class MediaPlayer {
    private State state;

    public MediaPlayer() {
        state = new StoppedState(); // Initial state
    }

    public void setState(State state) {
        this.state = state;
    }

    public void play() {
        state.play(this);
    }

    public void pause() {
        state.pause(this);
    }

    public void stop() {
        state.stop(this);
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        MediaPlayer player = new MediaPlayer();

        player.play();
        player.pause();
        player.play();
        player.stop();
    }
}
```

## Pros and cons

### Pros:

1. Promotes the Open/Closed Principle by allowing new states to be added without modifying existing code.
2. Simplifies code maintenance by encapsulating state-specific behavior into separate classes.
3. Enhances readability and reduces the complexity of the context class.

### Cons:

1. Can increase the number of classes, adding complexity to the system.
2. Requires careful management of state transitions to ensure correct behavior.
3. Can introduce overhead due to delegation if the state transitions are frequent.

## Conclusion

An elegant way to manage state-specific behaviour in a decoupled and maintained manner is to use the State pattern. It improves flexibility, readability, and compliance with the Open/Closed Principle by encapsulating state-specific functionality into distinct classes. The advantages of clean, manageable code and dynamic behaviour modifications make the State pattern an invaluable weapon in a developer's toolbox, even with the possible rise in the number of classes.
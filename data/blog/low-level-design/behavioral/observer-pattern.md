---
title: 'Observer Pattern'
date: '2024-06-03'
tags: ['System Design', 'Low Level Design', 'LLD', 'Design Patterns', 'Behavioral Design Pattern']
draft: false
summary: 'Observer Pattern: Decoupling state management and promoting flexible, dynamic updates in software systems.'
authors: ['default']
type: 'Blog'
images: []
---

A behavioural design pattern called the observer pattern enables an object, referred to as the subject, to keep track of dependents, referred to as observers, and to automatically alert them when the subject's state changes, usually by invoking one of its methods. This approach encourages loose coupling between the subject and its observers and is essential for developing distributed event-handling systems. It is frequently employed in situations when modifications to one item must cause changes in others without requiring a close integration of those changes.

## Current Problem

Objects must notify other objects of state changes in many software applications. When the data changes, for instance, a data model might have to update the view. If these items are connected directly, it may result in a tightly coupled system, which makes it more difficult to maintain and scale up modifications to one object without affecting many others. Handling these dependencies by hand might also result in complicated and prone to errors code.

## Solution through Observer Pattern

These problems are resolved by the Observer design, which establishes a one-to-many dependency between objects. The subject offers ways to attach, remove, and notify observers in addition to keeping track of them. All registered observers are notified when the subject's state changes so they can adjust their own information. By separating the topic from its observers, this method increases system flexibility and ease of maintenance by enabling the observers to change on their own.

## Real-World Applications

Consider a weather monitoring application where multiple displays (e.g., current conditions, statistics, forecast) need to update whenever the weather data changes.

1. **Centralized State Management**: The weather data is the subject, maintaining the state.
2. **Multiple Dependent Views**: Different display elements (current conditions, statistics, forecast) are observers.
3. **Automatic Updates**: Whenever the weather data changes, all registered displays are notified and updated automatically.

## Structure

The Observer pattern typically includes the following components:

1. **Subject**: Maintains a list of observers and provides methods to attach, detach, and notify them.
2. **Observer**: Defines an interface for objects that should be notified of changes in the subject.
3. **ConcreteSubject**: Implements the subject interface and notifies observers of state changes.
4. **ConcreteObserver**: Implements the observer interface and updates its state in response to notifications from the subject.

## Real-World Example with Code Snippet

Let's implement an example where a weather station (subject) notifies various displays (observers) about weather changes:

```Java
// Observer Interface
interface Observer {
    void update(float temperature, float humidity, float pressure);
}

// Subject Interface
interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// ConcreteSubject
class WeatherData implements Subject {
    private List<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherData() {
        observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }
}

// ConcreteObserver
class CurrentConditionsDisplay implements Observer {
    private float temperature;
    private float humidity;

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "F degrees and " + humidity + "% humidity");
    }
}
```

```Java
public class Main {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay();

        weatherData.registerObserver(currentDisplay);

        weatherData.setMeasurements(80, 65, 30.4f);
        weatherData.setMeasurements(82, 70, 29.2f);
        weatherData.setMeasurements(78, 90, 29.2f);
    }
}
```

## Pros and cons

### Pros:

1. Promotes loose coupling between the subject and its observers.
2. Enhances the flexibility and scalability of the system.
3. Facilitates dynamic addition and removal of observers.
4. Simplifies broadcasting state changes to multiple observers.

### Cons:

1. Can lead to memory leaks if observers are not properly removed.
2. The notification to all observers can be slow if there are many observers.
3. The order in which observers are notified is not guaranteed, which might be an issue in some scenarios.

## Conclusion

An effective method for preserving consistency among related items in a decoupled fashion is the Observer pattern. It makes dependency management easier and improves the system's flexibility and maintainability by centralising state changes and notifications in the topic. Though it has drawbacks such possible memory leaks and performance problems, this pattern is useful in many software architecture settings because it encourages loose coupling and facilitates dynamic connections.
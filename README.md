# booking-app-server

Small booking manager app to handler booking operation on renting beach houses.

I've developed this app to handle my rental houses small family business. It is not intended to be an enterprise level application. In fact it has three basic features:
* Place managment;
* Booking Calendar;
* Payments control;

## Architecture

This application is a core server to manage all resources and operations. There will be other client applications to consume this server by REST. In the future, I want this application will manage the booking calendars on multiple channels like Airbnb, Vrbo and others.

### Database

This is a small and simple application and I don't want to hype things write now. So choosed a Postgres SQL database to store application data. You can see the relational diagram in the following:

![image](./docs/diagrams/BookingEr.jpg)

* It was a design choise to DO NOT USE COMPOSITE KEYs to improve performance and prevent ORM compatibilities issues. In fact, composite keys behaviour will be simulated w/ unique indicies.

### Technologies

To this small server app I choosed .net 6 web application as the core language because it is fast, reliable, typed and cross platform.

Database managment will be handled by Entity Framework.

Security and User control will be handled by Identity Framework.

The comunication between server and client will rely over ssl and oAuth Authorization tokens.

### Structure

I want to Kepp it Simple!, so I choosed Clean Architecture as application layer structure and namespaces as domain segregation.

```
BookingApp.Domain
  - Bookings
  - Payments
  - Places
BookingApp.Services
  - Bookings
  - Payments
  - Places
BookingApp.Infra
  - Relational
  - Mappers
  - Configration
BookingApp.Server
  - Bookings
  - Payments
  - Places
```
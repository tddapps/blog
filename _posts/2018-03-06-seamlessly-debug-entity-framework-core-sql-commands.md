---
title: Seamlessly debug Entity Framework Core SQL commands
keywords:
  - csharp
  - nuget
  - entity framework
---

[Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) _(EF Core)_ is a lightweight [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) for [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/). It is a complete rewrite that maintains most of the functionality of [Entity Framework](https://docs.microsoft.com/en-us/ef/ef6/index). EF Core brings some exciting new features such as multi-platform support. And it also misses capabilities such as the ability to seamlessly debug the generated SQL. The EF Core team is tracking [this issue](https://github.com/aspnet/EntityFrameworkCore/issues/6482). In the meantime, here's my solution to the problem.  

**TL;DR:** [Use my `DebugEFCore` nuget package](https://github.com/camilin87/debug-ef-core)  

## Before: Entity Framework  

[Entity Framework](https://docs.microsoft.com/en-us/ef/ef6/index) provides a convenient way to [debug the database commands being executed](https://msdn.microsoft.com/en-us/library/dn469464%28v=vs.113%29.aspx).  

```csharp
using (var context = new SampleContext()) 
{ 
    context.Database.Log = Console.Write;
}
```

## After: EF Core  

I created the [`DebugEFCore` nuget package](https://github.com/camilin87/debug-ef-core) to achieve the same behavior.  

```csharp
using DebugEFCore;

public class SampleContext : DbContext
{
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    var debugLoggingEnabled = true;
    optionsBuilder.EnableLogging(debugLoggingEnabled);
  }
}
```

## FAQs

### Why debug the SQL code an ORM produces?  

[ORMs](https://en.wikipedia.org/wiki/Object-relational_mapping) abstract away many of the complexities of dealing with databases. They streamline the development process and help engineers focus on the task at hand.  

Many software projects work for years without encountering performance problems. Others are not so lucky: processes start to take longer, applications crash randomly, the same code doesn't work in different environments.  

The database is usually a smoking gun during performance issues. The problem with ORMs is that they abstract away the database interactions. A minor change in the ORM usage could ripple into major database performance issues. In times like these is necessary to debug the generated SQL code in order to effectively tweak the ORM usage.  

## Are ORMs bad?  

No. They are just tools. [Martin Fowler's views on the subject](https://martinfowler.com/bliki/OrmHate.html).  

## Should I write my own SQL commands?  

No. Replicating an ORM feature set is a gargantuan task. [Similar Stack Overflow question](https://stackoverflow.com/questions/494816/using-an-orm-or-plain-sql).  

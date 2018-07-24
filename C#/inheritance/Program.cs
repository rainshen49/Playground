using System;


public abstract class A
{
    private int value = 10;
    public abstract int getValue();
    public class B : A
    {
        public override int getValue()
        {
            return this.value;
        }
    }
}

public class C : A
{
    public override int getValue()
    {
        return 2;
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        var b = new A.B();
        var c = new C();
        Console.WriteLine(b.getValue());
    }
}
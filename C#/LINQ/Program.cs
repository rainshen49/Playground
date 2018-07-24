using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace LINQ
{
    public enum Suit
    {
        Clubs,
        Diamonds,
        Hearts,
        Spades
    }
    public enum Rank
    {
        Two,
        Three,
        Four,
        Five,
        Six,
        Seven,
        Eight,
        Nine,
        Ten,
        Jack,
        Queen,
        King,
        Ace
    }

    public class PlayingCard
    {
        public Suit CardSuit { get; }
        public Rank CardRank { get; }
        public PlayingCard(Suit s, Rank r)
        {
            CardSuit = s;
            CardRank = r;
        }
        public override string ToString()
        {
            return $"{CardRank} of {CardSuit}";
        }
    }
    
    class Program
    {
        static IEnumerable<Suit> Suits() => Enum.GetValues(typeof(Suit)) as IEnumerable<Suit>;
        static IEnumerable<Rank> Ranks() => Enum.GetValues(typeof(Rank)) as IEnumerable<Rank>;
        static void Main(string[] args)
        {
            var startingDeck = (from s in Suits().LogQuery("Suit Generation")
                                from r in Ranks().LogQuery("Rank Generation")
                                select new PlayingCard(s, r))
                                .LogQuery("Starting Deck").ToArray();

            foreach (var c in startingDeck)
            {
                Console.WriteLine(c);
            }
            Console.WriteLine();
            var top = startingDeck.Take(26);
            var bottom = startingDeck.Skip(26);
            // var shuffle = top.InterleaveSequenceWith(bottom);
            // foreach (var c in shuffle)
            // {
            //     Console.WriteLine(c);
            // }
            var times = 0;
            var shuffle = startingDeck;
            do
            {
                shuffle = shuffle.Skip(26).InterleaveSequenceWith(shuffle.Take(26)).LogQuery("Shuffle").ToArray();

                foreach (var c in shuffle)
                {
                    Console.WriteLine(c);
                }
                Console.WriteLine();
                times++;
            } while ((!startingDeck.SequenceEquals(shuffle)) && times < 10000);
            Console.WriteLine(times);
        }
    }

    public static class Extensions
    {
        public static IEnumerable<T> InterleaveSequenceWith<T>(this IEnumerable<T> first, IEnumerable<T> second)
        {
            var firstIter = first.GetEnumerator();
            var secondIter = second.GetEnumerator();

            while (firstIter.MoveNext() && secondIter.MoveNext())
            {
                yield return firstIter.Current;
                yield return secondIter.Current;
            }
        }
        public static bool SequenceEquals<T>(this IEnumerable<T> first, IEnumerable<T> second)
        {
            var firstIter = first.GetEnumerator();
            var secondIter = second.GetEnumerator();

            while (firstIter.MoveNext() && secondIter.MoveNext())
            {
                if (!firstIter.Current.Equals(secondIter.Current))
                {
                    return false;
                }
            }

            return true;
        }
        public static IEnumerable<T> LogQuery<T>(this IEnumerable<T> sequence, string tag)
        {
            using (var writer = File.AppendText("debug.log"))
            {
                writer.WriteLine($"Executing Query {tag}");
            }

            return sequence;
        }
    }
}

// https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/working-with-linq
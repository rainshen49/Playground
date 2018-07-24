module Main
where
import System.IO
import System.Random
import Control.Exception

main = do
    hSetBuffering stdin LineBuffering
    num <- randomRIO(1::Int,100)
    putStrLn ("I'm thinking of a number")
    doGuess num

doGuess num = do
    putStrLn "Enter your guess:"
    guess <- getLine
    let guessNum = read guess
    if guessNum < num
        then do putStr "Too Low!"
                doGuess num
        else if guessNum > num
            then do putStr "Too High!"
                    doGuess num
        else do putStrLn "You got it"

doHaskMessage = do
    putStrLn "What's your name?"
    name <- getLine
    case name of
        "Simon" -> do putStrLn "Haskell is a great programming language"
                      doHaskMessage
        "Koen" -> do putStrLn "Debugging in haskell is fun"

doReadFile filepath = 
    bracket (openFile filepath ReadMode) hClose
            (\h -> do contents <- hGetContents h
                      putStrLn "Here are the contents:\n"
                      putStrLn contents)

doWriteFile filepath = do
    putStrLn "What to put in file?"
    contents <- getLine
    bracket (openFile filepath WriteMode) hClose
            (\h -> hPutStrLn h contents)
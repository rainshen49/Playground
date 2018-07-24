module Main
where

import System.IO

x=5
y=6
z=x*y
-- this is a comment
squaretwice x = 
    let sq = x*x
    in sq * sq

fi 1 = 1
fi 0 = 1
fi n = 
    if n>1
        then fi(n-1)+fi(n-2)
        else 0
    

main = do
    hSetBuffering stdin LineBuffering
    putStrLn "Please enter your name: "
    name <- getLine
    putStrLn ("Hello, " ++ name ++ ", how are you?")
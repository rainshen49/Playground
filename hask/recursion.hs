repeat' :: (Ord a)=>a->Int->[a]
repeat' x n
    | n<=0 = []
    | otherwise = x:repeat' x (n-1)

-- quick sort
quicksort::(Ord a)=>[a]->[a]

quicksort []=[]
quicksort (x:rest)=
    quicksort [y|y<-rest,y<=x] ++ [x] ++ quicksort [y|y<-rest,y>x]
    -- this is amazing!

compose:: (a->b)->(b->c)->a->c
compose f g x= g (f x)
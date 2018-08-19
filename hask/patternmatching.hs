lucky :: (Integral a)=>a->String
lucky 13 = "Lucky you Thirteen!"
lucky x = "Not so lucky this time :("

vecadd:: (Num a)=>(a,a)->(a,a)->(a,a)
vecadd (x1,y1) (x2,y2)=(x1+x2,y1+y2)

-- triplets
first:: (a,b,c)->a
second:: (a,b,c)->b
third:: (a,b,c)->c

first (a,b,c)=a
second (a,b,c)=b
third (a,b,c)=c

nearme:: (String)->(String)

nearme me@(x:y:rest)="Inside:"++me++" There are "++[x]++","++[y]
nearme x=x

myname:: (String)->(String)

myname x
    | starting==r = "Correct"
    | starting==g = "Nope"
    | otherwise = "What?"
    -- this is like calculating local variables
    where starting = head x
          (g,r) = ('G','R')

-- let a=5 in a+1
-- will output 6

tellrelationship:: (String)->(String)->Bool
-- matches whether the firs argument is of length 2, second is of length 1
tellrelationship a b = case (a,b) of ([x,y],[z]) -> True
                                     _ -> False
                    
-- case statement is branching based on shape/constant val, guards is branching based on bool expressions
                            
data BinaryTree a
    = Leaf a 
    | Branch (BinaryTree a) a (BinaryTree a)

elements (Leaf a) = [a]
elements (Branch left x right) = (elements left)++[x]++(elements right)
treeFoldr f i (Leaf a)=f i a
treeFoldr f i (Branch l x r)=f (f (treeFoldr f i l) x) 
import Data.List (nub, sort, any, tails)
import qualified Data.Map as Map
import qualified Data.Set as Set
-- searching a list for a sublist
search:: (Eq a)=>[a]->[a]->Bool
search term inwhich = 
    any (\t -> term == take len t) $ tails inwhich
    where len = length term


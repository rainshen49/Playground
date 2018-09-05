module Geometry (
    sphereVolume,
    sphereArea
) where

sphereVolume :: Float -> Float
sphereVolume r = (4.0/3.0) * pi * (r^3)

sphereArea :: Float -> Float
sphereArea r = 4 * pi * (r^2)
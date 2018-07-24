x = 1: 100
y = 1+0.75*x^2 +rnorm(100,0,90)
par(mfrow=c(3,2))
plot(x,y)
plot(lm(y~x))
influence.measures(lm(y~x))$infmat[1:7,]

import numpy as np
N, D_in, H, D_out = 3, 2, 2, 2
x = np.rint(np.random.randn(N, D_in)*10)
y = np.rint(np.random.randn(N, D_out)*10)


def learnNumpy(rate, w1=np.random.randn(D_in, H), w2=np.random.randn(H, D_out)):
    print("input")
    print(x)
    print("output")
    print(y)
    for t in range(5):
        print("\n")
        h = x.dot(w1)
        print("h", h)
        h_relu = np.maximum(h, 0)
        print("hrelu", h_relu)
        y_pred = h_relu.dot(w2)
        print("ypred", y_pred)
        loss = np.square(y_pred-y).sum()
        print("step ", t, "loss ", loss)
        grad_y_pred = 2 * (y_pred-y)
        print("grad_y ", grad_y_pred)
        grad_w2 = h_relu.T.dot(grad_y_pred)
        print("grad_w2 ", grad_w2)
        grad_h_relu = grad_y_pred.dot(w2.T)
        print("grad_h_relu ", grad_h_relu)
        grad_h = grad_h_relu.copy()
        grad_h[h < 0] = 0
        print("grad_h ", grad_h)
        grad_w1 = x.T.dot(grad_h)
        print("grad_w1 ", grad_w1)
        w1 -= grad_w1*rate
        w2 -= grad_w2*rate
    return w1, w2


import torch
dtype = torch.float

x = torch.randn(N, D_in, dtype=dtype)
y = torch.randn(N, D_out, dtype=dtype)


def learnTorch(rate, w1=torch.randn(D_in, H, dtype=dtype), w2=torch.randn(H, D_out)):
    for t in range(5):
        h = x.mm(w1)
        h_relu = h.clamp(min=0)
        y_pred = h_relu.mm(w2)

        loss = (y_pred-y).pow(2).sum().item()
        print(t, loss)

        grad_y_pred = 2*(y_pred-y)
        grad_w2 = h_relu.t().mm(grad_y_pred)
        grad_h_relu = grad_y_pred.mm(w2.t())
        grad_h = grad_h_relu.clone()
        grad_h[h < 0] = 0
        grad_w1 = x.t().mm(grad_h)

        w1 -= rate*grad_w1
        w2 -= rate*grad_w2
    return w1, w2

import torch

N, D_in, H, D_out = 3, 2, 2, 2

x = torch.randn(N, D_in)
y = torch.randn(N, D_out)

print(x)
print(y)


class MyRelu(torch.autograd.Function):
    @staticmethod
    def forward(ctx, input):
        ctx.save_for_backward(input)
        return input.clamp(min=0)

    @staticmethod
    def backward(ctx, grad_output):
        input, = ctx.saved_tensors
        grad_input = grad_output.clone()
        grad_input[input < 0] = 0
        return grad_input


def learn(rate, w1=torch.randn(D_in, H, requires_grad=True), w2=torch.randn(H, D_out, requires_grad=True)):
    for t in range(5):
        y_pred = MyRelu.apply(x.mm(w1)).mm(w2)
        print(y_pred)
        loss = (y_pred-y).pow(2).sum()
        print(t, loss.item())

        loss.backward()
        with torch.no_grad():
            print("w1", w1)
            print("w2", w2)
            print("w1grad", w1.grad)
            print("w2grad", w2.grad)
            w1 -= rate*w1.grad
            w2 -= rate*w2.grad
            print("w1", w1)
            print("w2", w2)
            w1.grad.zero_()
            w2.grad.zero_()
            print("w1grad", w1.grad)
            print("w2grad", w2.grad)
            print("\n")
    return w1, w2

learn(0.001)

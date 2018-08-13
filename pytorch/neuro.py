import torch
import torch.nn as nn
import torch.optim as optim

N, D_in, H, D_out = 300, 20, 20, 200
x = torch.randn(N, D_in)
y = torch.randn(N, D_out)

model = nn.Sequential(
    nn.Linear(D_in, H),
    nn.ReLU(),
    nn.Linear(H, D_out)
)

loss_fn = nn.MSELoss(reduction="sum")


def learn(rate: float):
    opt = optim.Adam(model.parameters(), lr=rate)
    for t in range(9000):
        y_pred = model(x)
        loss = loss_fn(y_pred, y)
        if t % 200 == 0:
            print(t, loss.item())
        opt.zero_grad()
        loss.backward()

        opt.step()

    return [i for i in model.parameters()]


res = learn(0.0006)

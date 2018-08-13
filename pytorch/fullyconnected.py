import random
import torch
import torch.nn as nn
import torch.optim as optim


class DynaNet(nn.Module):
    def __init__(self, D_in, H, D_out):
        super(DynaNet, self).__init__()
        self.input_linear = nn.Linear(D_in, H)
        self.middle_linear = nn.Linear(H, H)
        self.output_linear = nn.Linear(H, D_out)

    def forward(self, x):
        h_relu = self.input_linear(x).clamp(min=0)
        for _ in range(random.randint(0, 3)):
            h_relu = self.middle_linear(h_relu).clamp(min=0)
        y_pred = self.output_linear(h_relu)
        return y_pred


N, D_in, H, D_out = 300, 20, 20, 200
x = torch.randn(N, D_in)
y = torch.randn(N, D_out)

model = DynaNet(D_in, H, D_out)

criterion = nn.MSELoss(reduction="sum")


def learn(rate, mmt=0.9):
    optimizer = optim.SGD(model.parameters(), lr=rate, momentum=mmt)
    for t in range(5000):
        y_pred = model(x)
        loss = criterion(y_pred, y)
        if t % 1000 == 0:
            print(t, loss.item())
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    return model.parameters()


params = learn(0.0000000001)

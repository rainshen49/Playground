//
//  atm.hpp
//  xcodeC++
//
//  Created by Rain Shen on 2018-07-15.
//  Copyright © 2018 Rain Shen. All rights reserved.
//

#ifndef atm_h
#define atm_h

class ATM{
public:
    ATM():age{},money{}
    {}
    //    this is how to do constructors
    ATM(int age, int money):age{age},money{money}
    {}
    int age;
    int DOB() const;
    int getMoney() const;
private:
    int money;
};


#endif /* atm_h */

//
//  main.cpp
//  xcodeC++
//
//  Created by Rain Shen on 2018-07-15.
//  Copyright © 2018 Rain Shen. All rights reserved.
//

#include <iostream>
#include "util.hpp"
#include "atm.hpp"

using namespace std;

union number {
    int intval;
    double dbval;
};

struct coffeeBean {
    string name;
    string country;
    number price;
};

coffeeBean myBean = {"Strata","Columnbia"};
enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday };

inline int zero(int numbers[]){
    return 0;
}

int main(int argc, const char * argv[]) {
    // insert code here...
    ATM const atm{5,0};
    string userinput;
    do
    {
        cout << "Enter menu choice " << endl << "More" << endl << "Quit" << endl;
        cin >> userinput;
        int ints[] = {1,2,3};
        ints[2]=add2(ints[2]);
        cout << ints[2]<<endl;
        cout << atm.age<<endl;
        cout << atm.DOB()<<endl;
        cout << atm.getMoney()<<endl;
        // Process the data.
        
    } while (userinput != "Quit");
    return 0;
}

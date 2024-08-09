#include <iostream>
#include <unistd.h>
#include <random>

using namespace std;

int getRandomNumber()
{
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 8);

    return dis(gen);
}

int main()
{
    int n = getRandomNumber();
    sleep(n);
    cout << "Program Execution Complete...";
    return getRandomNumber() <= 4 ? EXIT_SUCCESS : EXIT_FAILURE;
}
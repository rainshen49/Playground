using static System.Math;
using System;

namespace TeleprompterConsole{
    internal class TeleprompterConfig{
        private object lockhandle = new object();
        public int delay{get; private set;}=200;
        public void UpdateDelay(int increment){
            var newDelay=Min(delay+increment,1000);
            newDelay = Max(newDelay,20);
            lock(lockhandle){
                delay=newDelay;
            }
        }
        public bool Done => done;
        private bool done;
        public void SetDone()
        {
            done = true;    
        }
    }
}
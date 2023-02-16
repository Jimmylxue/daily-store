#include <napi.h>
#include "napi-thread-safe-callback.hpp"

#include <iostream>

// #include <node.h>
#include <windows.h>
#include <iostream>
#include <string>
#include <vector>

// using namespace v8;
using namespace std;

HHOOK keyboardHook;

vector<string> keysList; // keys what we will catch

string eventType;
int keysNum = 0; // keysList length
int i = 0;

std::shared_ptr<ThreadSafeCallback> cb;
Napi::Env env = NULL;

LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam)
{
  PKBDLLHOOKSTRUCT p = (PKBDLLHOOKSTRUCT)lParam;

  if (nCode >= 0)
  {
    if (wParam == WM_KEYUP || wParam == WM_SYSKEYUP)
    {
      std::string key = std::to_string(p->vkCode);
      cb->call([key](Napi::Env e, std::vector<napi_value> &args)
               { args = {Napi::String::New(e, key)}; });
    }
  }

  return CallNextHookEx(keyboardHook, nCode, wParam, lParam);
}

void setKeyboardHook()
{
  // Set hook
  keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, NULL, 0);
  std::cout << "set hook\n";
}

void start()
{
  setKeyboardHook();
}

void open(const Napi::CallbackInfo &info)
{
  cb = std::make_shared<ThreadSafeCallback>(info[0].As<Napi::Function>());
  start();
  return;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set("open", Napi::Function::New(env, open));
  return exports;
}

NODE_API_MODULE(addon, Init)
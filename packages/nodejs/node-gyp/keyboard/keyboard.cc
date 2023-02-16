#include <napi.h> // 使用Napi的namespace还有最后的NODE_API_MODULE(addon,Init)都是模板化的，照抄过来不用动。
#include "napi-thread-safe-callback.hpp"
#include <iostream>
#include <windows.h>

using namespace Napi;
using namespace std;

HHOOK keyboardHook;

std::shared_ptr<ThreadSafeCallback> cb;
Napi::Env env = NULL;

String Hello(const CallbackInfo &info)
{
  return String::New(info.Env(), "world");
}

LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam)
{
  PKBDLLHOOKSTRUCT p = (PKBDLLHOOKSTRUCT)lParam; // 创建p变量

  if (nCode >= 0)
  {
    if (wParam == WM_KEYUP || wParam == WM_SYSKEYUP)
    {
      // std::string key = checkKeyTable(p->vkCode);
      std::string key = std::to_string(p->vkCode);
      cb->call([key](Napi::Env e, std::vector<napi_value> &args)
               { args = {Napi::String::New(e, key)}; });
    }
  }

  // if (nCode >= 0)
  // {
  //   if (wParam == WM_KEYUP || wParam == WM_SYSKEYUP)
  //   {
  //     std::string key = std::to_string(p->vkCode); // 创建 key 是根据p做某种字符类型的转换
  //     cb->call([key](Napi::Env e, std::vector<napi_value> &args)
  //              { args = {Napi::String::New(e, key)}; }); // 大致意思调用全局的 cb 函数
  //   }
  // }
  // return CallNextHookEx(keyboardHook, nCode, wParam, lParam);
}

void setKeyboardHook()
{
  /**
   * SetWindowsHookEx 设置windows的一些hook
   *  常用于监听 鼠标 或者 键盘的一些钩子设置
   *
   */
  keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, NULL, 0);
  std::cout << "set hook\n";
  // Fail to set hook
  if (keyboardHook == NULL)
  {
  std:
    cout << "error";
    cerr << GetLastError();
    exit(1);
  }
}

void start()
{
  setKeyboardHook();
}

void listen(const Napi::CallbackInfo &info)
{
  // 用 cb 接受 js调用listen时传的一个回调函数
  cb = std::make_shared<ThreadSafeCallback>(info[0].As<Napi::Function>());
  start(); // 执行start方法

  return
}

Napi::Object Init(Env env, Object exports)
{
  // 一个个导出函数
  exports.Set("hello", Function::New(env, Hello));   // 暴露出 hello 函数
  exports.Set("listen", Function::New(env, listen)); // 暴露出 listen 函数
  return exports;
}
NODE_API_MODULE(addon, Init)
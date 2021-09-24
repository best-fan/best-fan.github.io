# h5-微信网页授权相关
## 说明：
微信网页授权登录调试相关技巧

## 微信网页授权方式：
 - 静默授权：无需用户同意，自动跳转到回调页 通常用于只获取用户openId,不需要获取用户信息.

 - 分静默授权：需用户同意，用户同意后 跳转到回调页，通常用于 获取用户基本信息、openid 等.

## 授权过程：

 ### 1、获取code
 请求url:https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect 

 参数说明：

| 参数 | 是否必填 | 说明 |
| :-----| :----: | :---- |
| appid | 是 | 公众号的唯一标识 |
| response_type | 是 | 返回类型，请填写code |
| scope | 是 | 授权方式 <kbd>snsapi_base</kbd> （不弹出授权页面，直接跳转，只能获取用户openid），<kbd>snsapi_userinfo</kbd> （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）|
| state | 否 | 重定向后会带上<kbd>state</kbd>参数，以填写a-zA-Z0-9的参数值，最多128字节 |
| #wechat_redirect | 是 | 无论直接打开还是做页面302重定向时候，必须带此参数 |

scope等于snsapi_userinfo时的授权:

![预览图](http://blog.bravetimes.cn/api/public/uploads/2021/09/24/1632453404296628.png)

授权后 页面会跳转到： redirect_uri/?code=CODE&state=STATE。

**本地通过重定向<kbd>redirect_uri</kbd>进行拦截**

 1.修改本地host 文件
 - host 文件地址:<kbd>C:\Windows\System32\drivers\etc</kbd>

 ![host](http://blog.bravetimes.cn/api/public/uploads/2021/09/24/1632454840511160.png)

 - 测试是否修改成功：
 ![ping](http://blog.bravetimes.cn/api/public/uploads/2021/09/24/1632455047028963.png)

 - 若ping 无效 可刷新dns缓存后再试！ <kbd>ipconfig /flushdns</kbd>
 一般情况本地跑起来的项目不是80端口 因此 我们需要更改本地项目端口(**适用于本地80端口未使用情况**)
 -以uniapp项目为例：只需修改<kbd>manifest.json</kbd> 文件即可：
 ![端口](http://blog.bravetimes.cn/api/public/uploads/2021/09/24/1632455433619827.png)
 ![端口成功](http://blog.bravetimes.cn/api/public/uploads/2021/09/24/1632455442606203.png)

 2、开启本地nginx 实现
   - 下载nginx [地址](http://nginx.org/en/download.html)
   - 配置nginx：
    两种方式：
     - 1、通过proxy_pass 直接转发端口 
     ```js
      location / {
			proxy_pass http://192.168.0.230:8081;
     }
     ```
     - 2、通过设置root目录实现
     ```js
        location / {
			root    D:/web/special-new-h5/dist/build/h5;
            index  index.html index.htm;
			try_files $uri $uri/ /index.html;
        }
     ```
 提示:code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。




### 2、通过code 获取网页授权access_token
 请求url: https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

<p style="color:red;font-weight:bold">url必须在服务器端进行调用,本地调用会提示跨域</p>

[说明](https://developers.weixin.qq.com/community/develop/doc/0002a657b50ee8927a3ab4e5750800)

 参数说明：

| 参数 | 是否必填 | 说明 |
| :-----| :----: | :---- |
| appid| 是 | 公众号的唯一标识 |
| secret| 是 | 公众号的appsecret |
| code| 是 | 填写第一步获取的code参数 |
| grant_type| 是 | 填写为authorization_code |

返回值：
```js
{
  "access_token":"ACCESS_TOKEN",
  "expires_in":7200,
  "refresh_token":"REFRESH_TOKEN",
  "openid":"OPENID",
  "scope":"SCOPE" 
}
```
获取到openid  就可以和后台进行传递了。

## 相关文档：
[微信测试号平台](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)
、[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
、[微信web开发文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

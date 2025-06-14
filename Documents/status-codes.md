# 状态码说明文档

本项目中使用的所有 HTTP 状态码及其含义。

## 2xx 成功状态码

### 200 OK
- 表示请求成功
- 用于：
  - 获取用户列表
  - 健康检查（服务正常）
  - 登录成功
  - 获取用户信息
  - 更新用户信息
  - 获取部门列表
  - 获取角色列表

### 201 Created
- 表示资源创建成功
- 用于：
  - 创建新用户

### 202 Accepted
- 表示请求已接受，但需要进一步处理
- 用于：
  - 登录时需要验证码的情况

## 4xx 客户端错误状态码

### 400 Bad Request
- 表示请求参数错误或无效
- 用于：
  - 用户名已存在
  - 请求参数格式错误
  - 必填字段缺失
  - 参数验证失败

### 401 Unauthorized
- 表示未授权访问
- 用于：
  - 未提供认证令牌
  - 认证令牌无效
  - 认证令牌已过期
  - 用户未登录

### 403 Forbidden
- 表示禁止访问
- 用于：
  - 用户权限不足
  - 资源访问受限

### 404 Not Found
- 表示请求的资源不存在
- 用于：
  - 用户不存在
  - 部门不存在
  - 角色不存在
  - 接口路径不存在

### 409 Conflict
- 表示资源冲突
- 用于：
  - 用户名已存在
  - 邮箱已被使用
  - 手机号已被使用

### 429 Too Many Requests
- 表示请求过于频繁
- 用于：
  - 登录尝试次数过多
  - API 调用频率超限

## 5xx 服务器错误状态码

### 500 Internal Server Error
- 表示服务器内部错误
- 用于：
  - 数据库操作失败
  - 服务器异常
  - 健康检查失败
  - 未预期的错误

## 响应格式

所有 API 响应都遵循统一的格式：

```json
{
  "code": <状态码>,
  "message": <状态描述>,
  "data": <响应数据>
}
```

其中：
- `code`: 与 HTTP 状态码对应的数字
- `message`: 人类可读的状态描述
- `data`: 响应数据，在错误情况下可能为 null

## 特殊状态说明

### 健康检查状态
健康检查接口（`/api/v1/health`）使用特殊的 `status` 字段来表示系统状态：
- `ok`: 系统完全正常
- `warning`: 系统部分异常（如数据库连接异常）

### 数据库状态
数据库状态检查使用以下状态：
- `ok`: 数据库连接正常
- `error`: 数据库连接异常

## 最佳实践

1. 客户端应该始终检查 HTTP 状态码和响应体中的 `code` 字段
2. 对于 4xx 错误，应该查看 `message` 字段了解具体错误原因
3. 对于 5xx 错误，应该记录错误日志并联系系统管理员
4. 对于 429 错误，应该实现适当的重试机制
5. 对于 401 错误，应该重新获取认证令牌 
/**
 * ajax
 * @param {Object} reqData 
 * reqData.url 请求路径
 * reqData.method 请求方式，可选的
 * reqData.data 请求数据,json格式{}，可选的
 */

function ajax(reqData) {
    return new Promise((resolve, reject) => {
        // 检查url 合法性
        let url = reqData.url.trim()
        if (!reqData.url) {
            reject({
                errCode: 101,
                errInfo: 'url 不能为空'
            })
            return
        }
        // 检查请求方式 合法性
        let method = reqData.method.trim()
        method = method.toLowerCase()
        if (!method) {
            method = 'get'
        }
        if (!(-1 < 'get'.indexOf(method) || -1 < 'post'.indexOf(method) || -1 < 'put'.indexOf(method) || -1 < 'delete'.indexOf(method))) {
            reject({
                errCode: 102,
                errInfo: '请求方式错误'
            })
            return
        }

        let fd = null
        let data = reqData.data
        if (data) {
            if ('get' === method) {
                url += '?'
                for (const key in data) {
                    url += `${key}=${data[key]}&`
                }
            } else if ('delete' === method) {
                url += '?'
                for (const key in data) {
                    url += `${key}=${data[key]}&`
                }
                fd = JSON.stringify(data)
            } else if ('put' === method) {
                fd = JSON.stringify(data)
            } else {
                fd = new FormData()
                for (const key in data) {
                    fd.append(key, data[key])
                }
            }
        }

        // 1 创建请求对象
        let xhr = new XMLHttpRequest()
        // 2. 设置请求参数
        xhr.open(method, url)
        if (reqData.contentType) {
            xhr.setRequestHeader("Content-type", reqData.contentType)
        }
        // 3. 发送请求
        xhr.send(fd)
        // 4.监听响应
        xhr.onreadystatechange = function () {
            if (4 === this.readyState) {
                console.log(this.status,'this.status')
                if (201 === this.status || 200 === this.status) {
                    console.log('成功回调')
                    try {
                        resolve(JSON.parse(this.responseText))
                    } catch (error) {
                        resolve(this.responseText)
                    }
                } else {
                    console.log('第一次失败')
                    reject(this)
                }
            } 
            // else {
            //     console.log('第二次失败')
            //     reject(this)
            // }
        }

    })
}
export default ajax
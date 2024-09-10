import {notification} from "antd"
import {CheckCircle, WarningCircle, X} from "phosphor-react"
import type React from "react"

type Notification = {
    message: string
    description: string
    type: "SUCCESS" | "ERROR"
    icon?: React.ReactNode
    closeIcon?: React.ReactNode
}

const getDefaultCloseIcon = () => <X/>

const getColorByType = (type: Notification["type"]) => {
    switch (type) {
        case "SUCCESS":
            return "#22c55e"
        case "ERROR":
            return "#ef4444"
        default:
            return "#22c55e"
    }
}

const getIconByType = (type: Notification["type"]) => {
    switch (type) {
        case "SUCCESS":
            return (
                <CheckCircle style={{color: getColorByType(type)}} weight="fill"/>
            )
        case "ERROR":
            return (
                <WarningCircle style={{color: getColorByType(type)}} weight="fill"/>
            )
        default:
            return <></>
    }
}

export const useGetNotification = () => {
    const showNotification = (config: Notification) => {
        notification.open({
            message: config.message,
            description: config.description,
            icon: config?.icon ?? getIconByType(config.type),
            closeIcon: config?.closeIcon ?? getDefaultCloseIcon(),
        })
    }

    return {showNotification}
}

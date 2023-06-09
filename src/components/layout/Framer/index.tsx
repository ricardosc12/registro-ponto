"use client"

import { motion } from "framer-motion"
import style from './style.module.css'

interface Props {
    children: string | JSX.Element | JSX.Element[] | React.ReactNode
}

export default function Framer({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0 }}
            className={style.root_framer}
        >
            {children}
        </motion.div>
    )
}
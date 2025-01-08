import styles from './styles.module.scss'
import { RefreshCcw } from 'lucide-react'
import { OrdersProp } from '@/lib/order.type'

interface Props{
    orders: OrdersProp[];
} 

export default function Orders({orders}: Props){
    return(
        <main className={styles.container} >
            <section className={styles.containerHeader}>
                <h1>Ultimos pedidos</h1>
                <button>
                    <RefreshCcw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.listOrders}>
                {orders.map(order => (
                    <button
                        key={order.id}
                        className={styles.orderItem}
                    >
                        <div className={styles.tag} />                        
                        <span>Mesa {order.table}</span>                                        
                    </button>
                ))}
            </section>
        </main>                
    )
}
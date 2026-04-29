export type OperationResult = {
    success: boolean
}

export type AdminUser = {
    id: number
    email: string
    name: string
}

export type AccessToken = {
    accessToken: string
    adminUser: AdminUser
}
  
export type User = {
    id: number
    nickname: string
    profileImageUrl: string | null
    description: string
    name: string
    postalCode: string
    address: string
    email: string
    tel: string
}

export type Product = {
  id: number
  name: string
  description: string
  imageUrl: string
  imageUrls: string[]
  price: number
}
export type PaymentIntent = {
    clientSecret: string
}
export type DealStatus = 'listing' | 'purchased' | 'shipping' | 'completed' | 'canceled'
export function dealStatusLabel(dealStatus: DealStatus) {
    switch (dealStatus) {
        case 'listing':
            return '出品中'
        case 'purchased':
            return '購入済'
        case 'shipping':
            return '配送中'
        case 'completed':
            return '取引完了'
        case 'canceled':
            return 'キャンセル'
    }
}
export type Deal = {
    id: number;
    product: Product
    buyer: User|null
    seller: User
    status: DealStatus
}
export type DealDetail = {
    id: number;
    product: Product
    buyer: User|null
    seller: User
    status: DealStatus
    dealEvents: DealEvent[]
}

export type DealEventActorType = 'seller' | 'buyer' | 'admin'
export function actorLabel(eventActor: DealEventActorType) {
    switch (eventActor) {
        case 'seller':
            return '出品者'
        case 'buyer':
            return '購入者'
        case 'admin':
            return 'Larashop管理者'
    }
}
export type DealEventEventType = 'listing' | 'purchase' |
    'report_delivery' | 'report_receipt' | 'payment_refund' | 'cancel'
export function dealEventTypeLabel(dealEventType: DealEventEventType) {
    switch (dealEventType) {
        case 'listing':
            return '出品'
        case 'purchase':
            return '購入'
        case 'report_delivery':
            return '発送連絡'
        case 'report_receipt':
            return '受取連絡'
        case 'payment_refund':
            return '返金'
        case 'cancel':
            return 'キャンセル'
    }
}
export type DealEvent = {
    id: number
    actorType: DealEventActorType
    eventType: DealEventEventType
    createdAt: string
}

export type PaginationMeta = {
    currentPage: number;
    from: number;
    to: number;
    total: number;
    perPage: number;
    lastPage: number;
}

type Pagination<T> = {
    data: T;
    meta: PaginationMeta;
}

export type UserPagination = Pagination<{ users: User[] }>
export type DealPagination = Pagination<{ deals: Deal[] }>

export type Error = {
    statusCode: number
    message: string
    errors?: { field: string, detail: string}[]
}
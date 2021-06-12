import React, { useContext, useState } from 'react'
import { WatchListContext } from '../context/watchListContext'
import {v4 as uuidv4} from 'uuid'

const AddCoin = () => {


    const [isActive, setIsActive] = useState(false)
    const { addCoin } = useContext(WatchListContext)

    const availableCoins = [
        "Bitcoin",
        "Ethereum",
        "Ripple",
        "Tether",
        "Bitcoin-cash",
        "Litecoin",
        "EOS",
        "OKB",
        "NEO",
        "Tezos",
        "Cardano",
        "Polkadot",
        "Dogecoin",
        "Uniswap",
        "Chainlink",
        "Solana",
        "Stellar",
        "VeChain",
        "Filecoin",
        "TRON",
        "Monero",
        "Cosmos",
        "Algorand",
        "SafeMoon"
    ]

    const handleClick = (coin) => {
        addCoin(coin)
        setIsActive(false)
    }


    return (
        <div className="dropdown">
            <button onClick={() => setIsActive(!isActive)}
                className="btn btn-primary dropdown-toggle"
                type="button">
                Add Coin
            </button>
            <div className={isActive ?
                "dropdown-menu scrollable-menu show"
                : "dropdown-menu scrollable-menu"}>
                {availableCoins.map(el => {
                    return (
                        <a onClick={() => handleClick(el.toLowerCase())} href="/" className="dropdown-item" key={uuidv4()} >{el}</a>
                    )
                })}
            </div>
        </div>
    )
}

export default AddCoin

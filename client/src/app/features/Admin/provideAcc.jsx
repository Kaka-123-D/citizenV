import React from 'react'

export default function provideAcc() {
    return (
        <form>
            <input placeholder="Username"></input>
            <input placeholder="Password"></input>
            <input placeholder="Full Name"></input>
            <input placeholder="Phone"></input>
            <select>
                <option value="">full</option>
                <option value="">edit</option>
                <option value="">view</option>
            </select>
            <select>
                <option value="">A1</option>
                <option value="">A2</option>
                <option value="">A3</option>
                <option value="">B1</option>
                <option value="">B2</option>
            </select>
        </form>
    )
}

import React from 'react'

interface Props {
    id: number,
    title: string;
    statusType: string;
    selectGroup:(text: string) => void;
}
export default class Groups extends React.Component<Props, any> {
    getStatusIcon = (type) => {
        switch (type) {
            case 'warning':
                return (
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6115 12.0316C15.085 12.9064 14.4906 14 13.5448 14H1.23287C0.285224 14 -0.306452 12.9047 0.16618 12.0316L6.3222 0.65584C6.79599 -0.219406 7.98265 -0.21782 8.45559 0.65584L14.6115 12.0316ZM7.3889 9.67969C6.73711 9.67969 6.20873 10.2428 6.20873 10.9375C6.20873 11.6322 6.73711 12.1953 7.3889 12.1953C8.04068 12.1953 8.56907 11.6322 8.56907 10.9375C8.56907 10.2428 8.04068 9.67969 7.3889 9.67969ZM6.26843 5.15851L6.45874 8.87726C6.46765 9.05127 6.60265 9.1875 6.76615 9.1875H8.01164C8.17515 9.1875 8.31015 9.05127 8.31905 8.87726L8.50937 5.15851C8.51899 4.97055 8.37857 4.8125 8.20196 4.8125H6.57581C6.3992 4.8125 6.25881 4.97055 6.26843 5.15851Z" fill="#F65A1C" />
                    </svg>
                )
            case 'completed':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99981 0.761719C4.00271 0.761719 0.761719 4.00271 0.761719 7.99981C0.761719 11.9969 4.00271 15.2379 7.99981 15.2379C11.9969 15.2379 15.2379 11.9969 15.2379 7.99981C15.2379 4.00271 11.9969 0.761719 7.99981 0.761719ZM11.1261 5.63612L7.72354 10.3538C7.67598 10.4202 7.61329 10.4743 7.54066 10.5116C7.46803 10.5489 7.38755 10.5684 7.30589 10.5684C7.22424 10.5684 7.14376 10.5489 7.07113 10.5116C6.9985 10.4743 6.93581 10.4202 6.88825 10.3538L4.87354 7.56197C4.81214 7.47634 4.87354 7.35679 4.97856 7.35679H5.73629C5.90109 7.35679 6.05781 7.43595 6.15475 7.57167L7.30509 9.16793L9.84488 5.64582C9.94182 5.51172 10.0969 5.43094 10.2633 5.43094H11.0211C11.1261 5.43094 11.1875 5.55049 11.1261 5.63612Z" fill="#219653" />
                    </svg>
                )
            case 'selected':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <path d="M14.6115 12.0316C15.085 12.9064 14.4906 14 13.5448 14H1.23287C0.285224 14 -0.306452 12.9047 0.16618 12.0316L6.3222 0.65584C6.79599 -0.219406 7.98265 -0.21782 8.45559 0.65584L14.6115 12.0316ZM7.3889 9.67969C6.73711 9.67969 6.20873 10.2428 6.20873 10.9375C6.20873 11.6322 6.73711 12.1953 7.3889 12.1953C8.04068 12.1953 8.56907 11.6322 8.56907 10.9375C8.56907 10.2428 8.04068 9.67969 7.3889 9.67969ZM6.26843 5.15851L6.45874 8.87726C6.46765 9.05127 6.60265 9.1875 6.76615 9.1875H8.01164C8.17515 9.1875 8.31015 9.05127 8.31905 8.87726L8.50937 5.15851C8.51899 4.97055 8.37857 4.8125 8.20196 4.8125H6.57581C6.3992 4.8125 6.25881 4.97055 6.26843 5.15851Z" fill="white"/>
                    </svg>
                )
            default:
                return (
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6115 12.0316C15.085 12.9064 14.4906 14 13.5448 14H1.23287C0.285224 14 -0.306452 12.9047 0.16618 12.0316L6.3222 0.65584C6.79599 -0.219406 7.98265 -0.21782 8.45559 0.65584L14.6115 12.0316ZM7.3889 9.67969C6.73711 9.67969 6.20873 10.2428 6.20873 10.9375C6.20873 11.6322 6.73711 12.1953 7.3889 12.1953C8.04068 12.1953 8.56907 11.6322 8.56907 10.9375C8.56907 10.2428 8.04068 9.67969 7.3889 9.67969ZM6.26843 5.15851L6.45874 8.87726C6.46765 9.05127 6.60265 9.1875 6.76615 9.1875H8.01164C8.17515 9.1875 8.31015 9.05127 8.31905 8.87726L8.50937 5.15851C8.51899 4.97055 8.37857 4.8125 8.20196 4.8125H6.57581C6.3992 4.8125 6.25881 4.97055 6.26843 5.15851Z" fill="#F65A1C" />
                    </svg>
                )
        }
    }
    
    getEditIcon = (type) => {
        switch (type) {
            case 'warning':
                return (
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8727 2.27617L13.3086 4.74257C13.4113 4.84648 13.4113 5.01601 13.3086 5.11992L7.41049 11.0918L4.90432 11.3734C4.56944 11.4117 4.28588 11.1246 4.32369 10.7855L4.60185 8.24804L10.5 2.27617C10.6026 2.17226 10.7701 2.17226 10.8727 2.27617ZM15.2477 1.65L13.9298 0.315625C13.5193 -0.0999999 12.8522 -0.0999999 12.439 0.315625L11.483 1.28359C11.3804 1.3875 11.3804 1.55703 11.483 1.66094L13.919 4.12734C14.0216 4.23125 14.189 4.23125 14.2917 4.12734L15.2477 3.15937C15.6582 2.74101 15.6582 2.06562 15.2477 1.65ZM10.3704 9.46757V12.2512H1.72839V3.50117H7.93441C8.02083 3.50117 8.10185 3.46562 8.16397 3.40547L9.24421 2.31172C9.44946 2.1039 9.30363 1.75117 9.01466 1.75117H1.2963C0.580633 1.75117 0 2.33906 0 3.06367V12.6887C0 13.4133 0.580633 14.0012 1.2963 14.0012H10.8025C11.5181 14.0012 12.0988 13.4133 12.0988 12.6887V8.37382C12.0988 8.08124 11.7504 7.93632 11.5451 8.1414L10.4649 9.23515C10.4055 9.29804 10.3704 9.38007 10.3704 9.46757Z" fill="#F65A1C" />
                    </svg>
                )
            case 'completed':
                return (
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8727 2.27617L13.3086 4.74257C13.4113 4.84648 13.4113 5.01601 13.3086 5.11992L7.41049 11.0918L4.90432 11.3734C4.56944 11.4117 4.28588 11.1246 4.32369 10.7855L4.60185 8.24804L10.5 2.27617C10.6026 2.17226 10.7701 2.17226 10.8727 2.27617ZM15.2477 1.65L13.9298 0.315625C13.5193 -0.0999999 12.8522 -0.0999999 12.439 0.315625L11.483 1.28359C11.3804 1.3875 11.3804 1.55703 11.483 1.66094L13.919 4.12734C14.0216 4.23125 14.189 4.23125 14.2917 4.12734L15.2477 3.15937C15.6582 2.74101 15.6582 2.06562 15.2477 1.65ZM10.3704 9.46757V12.2512H1.72839V3.50117H7.93441C8.02083 3.50117 8.10185 3.46562 8.16397 3.40547L9.24421 2.31172C9.44946 2.1039 9.30363 1.75117 9.01466 1.75117H1.2963C0.580633 1.75117 0 2.33906 0 3.06367V12.6887C0 13.4133 0.580633 14.0012 1.2963 14.0012H10.8025C11.5181 14.0012 12.0988 13.4133 12.0988 12.6887V8.37382C12.0988 8.08124 11.7504 7.93632 11.5451 8.1414L10.4649 9.23515C10.4055 9.29804 10.3704 9.38007 10.3704 9.46757Z" fill="#219653" />
                    </svg>
                )
            case 'selected':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                        <g clip-path="url(#clip0)">
                            <path d="M10.8727 2.27599L13.3086 4.74239C13.4113 4.8463 13.4113 5.01583 13.3086 5.11973L7.41049 11.0916L4.90432 11.3732C4.56944 11.4115 4.28588 11.1244 4.32369 10.7854L4.60185 8.24786L10.5 2.27599C10.6026 2.17208 10.7701 2.17208 10.8727 2.27599ZM15.2477 1.64982L13.9298 0.315442C13.5193 -0.100183 12.8522 -0.100183 12.439 0.315442L11.483 1.28341C11.3804 1.38732 11.3804 1.55685 11.483 1.66075L13.919 4.12716C14.0216 4.23106 14.189 4.23106 14.2917 4.12716L15.2477 3.15919C15.6582 2.74083 15.6582 2.06544 15.2477 1.64982ZM10.3704 9.46739V12.251H1.72839V3.50099H7.93441C8.02083 3.50099 8.10185 3.46544 8.16397 3.40528L9.24421 2.31153C9.44946 2.10372 9.30363 1.75099 9.01466 1.75099H1.2963C0.580633 1.75099 0 2.33888 0 3.06349V12.6885C0 13.4131 0.580633 14.001 1.2963 14.001H10.8025C11.5181 14.001 12.0988 13.4131 12.0988 12.6885V8.37364C12.0988 8.08106 11.7504 7.93614 11.5451 8.14122L10.4649 9.23497C10.4055 9.29786 10.3704 9.37989 10.3704 9.46739Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="15.5556" height="14" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                )
            default:
                return (
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8727 2.27617L13.3086 4.74257C13.4113 4.84648 13.4113 5.01601 13.3086 5.11992L7.41049 11.0918L4.90432 11.3734C4.56944 11.4117 4.28588 11.1246 4.32369 10.7855L4.60185 8.24804L10.5 2.27617C10.6026 2.17226 10.7701 2.17226 10.8727 2.27617ZM15.2477 1.65L13.9298 0.315625C13.5193 -0.0999999 12.8522 -0.0999999 12.439 0.315625L11.483 1.28359C11.3804 1.3875 11.3804 1.55703 11.483 1.66094L13.919 4.12734C14.0216 4.23125 14.189 4.23125 14.2917 4.12734L15.2477 3.15937C15.6582 2.74101 15.6582 2.06562 15.2477 1.65ZM10.3704 9.46757V12.2512H1.72839V3.50117H7.93441C8.02083 3.50117 8.10185 3.46562 8.16397 3.40547L9.24421 2.31172C9.44946 2.1039 9.30363 1.75117 9.01466 1.75117H1.2963C0.580633 1.75117 0 2.33906 0 3.06367V12.6887C0 13.4133 0.580633 14.0012 1.2963 14.0012H10.8025C11.5181 14.0012 12.0988 13.4133 12.0988 12.6887V8.37382C12.0988 8.08124 11.7504 7.93632 11.5451 8.1414L10.4649 9.23515C10.4055 9.29804 10.3704 9.38007 10.3704 9.46757Z" fill="#F65A1C" />
                    </svg>
                )
        }
    }
    
    
    getStatus = () => {
        switch (this.props.statusType) {
            case 'selected':
                return 'orange-fill'
                break;
            case 'warning':
                return 'orange'
                break;
            case 'completed':
                return 'green'
                break;
            default:
                return ''
                break;
        }
    }
    render() {
        const color = this.getStatus();
        
        const {selectGroup} = this.props
        return (
            <div className={`list ${color}`} onClick={(e) => selectGroup("positive")} >
                <div className="group">
                    <span>
                        {this.getStatusIcon(this.props.statusType)}
                    </span>
                    <span className="group-title">{this.props.title}</span>
                </div>
                <div className="edit-icon">
                    <span>
                        {this.getEditIcon(this.props.statusType)}
                    </span>
                </div>
            </div>
        )
    }
} 